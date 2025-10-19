#!/bin/bash
set -x # Print all executed commands to the terminal
set -e # Exit immediately if a command exits with a non-zero status

# --- Configuration ---
CHANGELOGS_DIR="changelogs"
REPO_URL=$(git remote get-url origin | sed 's/\.git$//')
REPO_NAME=$(echo "$REPO_URL" | sed 's/.*://')
PACKAGE_JSON="package.json"

# --- Helper: get current version from package.json ---
CURRENT_VERSION=$(jq -r '.version' "$PACKAGE_JSON")

# --- Step 1: Generate changelog draft using git-cliff ---
echo "📝 Generating changelog since last release..."
CHANGELOG_BODY=$(git cliff --unreleased --strip all | sed '1{/^## \[unreleased\]$/d};2{/^$/d}')

if [[ -z "$CHANGELOG_BODY" || "$CHANGELOG_BODY" == *"No commits found"* ]]; then
  echo "⚠️ No new commits since last release. Exiting."
  exit 1
fi

echo "📄 Preview of release notes:"
echo "----------------------------------------"
echo "$CHANGELOG_BODY"
echo "----------------------------------------"

# --- Step 2: Prompt for new version ---
read -p "🔖 Enter new version (previous: $CURRENT_VERSION): " NEW_VERSION

if [[ -z "$NEW_VERSION" ]]; then
  echo "❌ Version is required. Aborting."
  exit 1
fi

# Validate semver-ish format (basic check)
if ! [[ "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-.*)?$ ]]; then
  echo "❌ Invalid version format. Must be like 1.2.3 or 1.2.3-beta.1"
  exit 1
fi

# --- Step 3: Generate changelog file ---
DATE=$(date +%Y-%m-%d)
CHANGELOG_FILE="$CHANGELOGS_DIR/${DATE}_v${NEW_VERSION}.md"
mkdir -p "$CHANGELOGS_DIR"
FULL_CHANGELOG="## [${NEW_VERSION}] - ${DATE}

${CHANGELOG_BODY}"
echo "$FULL_CHANGELOG" > "$CHANGELOG_FILE"
echo "📄 Changelog saved to: $CHANGELOG_FILE"

# --- Step 4: Review changelog ---
echo "📄 Review the generated changelog:"
cat "$CHANGELOG_FILE"
read -p "✅ Proceed with publishing? (y/N): " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "❌ Aborted by user."
  exit 1
fi

# --- Step 5: Update package.json ---
echo "🔄 Updating $PACKAGE_JSON to v$NEW_VERSION..."
jq --arg v "$NEW_VERSION" '.version = $v' "$PACKAGE_JSON" > tmp.$$.json && mv tmp.$$.json "$PACKAGE_JSON"
TAG="v$NEW_VERSION"

# --- Step 6: Git Commit and push ---
git add "$CHANGELOG_FILE" "$PACKAGE_JSON"
git commit -m "chore(release): v$NEW_VERSION"
git tag -a "$TAG" -m "Release v$NEW_VERSION"
git push origin main
git push origin --tags
git push gitlab main
git push gitlab --tags

# --- Step 7: Create GitHub release ---
echo "☁️ Creating GitHub release..."
gh release create "$TAG" \
  --title "v$NEW_VERSION" \
  --notes-file "$CHANGELOG_FILE" \
  --repo "$REPO_NAME"

echo "✅ Release v$NEW_VERSION complete!"
echo "📄 Changelog: $CHANGELOG_FILE"
echo "🔗 GitHub: https://github.com$(echo "$REPO_URL" | sed 's/.*github.com//')/releases/tag/$TAG"
