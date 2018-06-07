#!/bin/sh

DIRECTORY="dist"
BRANCH="dist"

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "backup content"
mkdir "$DIRECTORY-tmp"
cp -r $DIRECTORY/* "$DIRECTORY-tmp/"

echo "Deleting old buildation"
rm -rf $DIRECTORY
mkdir $DIRECTORY
git worktree prune
rm -rf .git/worktrees/$DIRECTORY/

echo "Checking out gh-pages branch into build"
git worktree add -B $BRANCH $DIRECTORY

echo "Removing existing files"
rm -rf $DIRECTORY/*

echo "Generating site"
cp -r "$DIRECTORY-tmp"/* $DIRECTORY/
rm -rf "$DIRECTORY-tmp"

echo "Updating gh-pages branch"
cd $DIRECTORY && git add --all && git commit -m "Publishing to $BRANCH (publish.sh)"
git push --force origin $BRANCH