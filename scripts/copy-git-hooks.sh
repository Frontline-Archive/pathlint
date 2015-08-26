#!/bin/sh

bold=`tput bold`
attention=`tput setab 1`
normal=`tput sgr0`

if [ -d .git/hooks ]; then

	if [ -f config/git-hooks/pre-commit ]; then
		echo "\n\n${bold}Copying pre-commit hook${normal}"

		if [ -f .git/hooks/pre-commit ]; then
			DIFF=$(diff .git/hooks/pre-commit config/git-hooks/pre-commit)
			if [ "$DIFF" != "" ]; then
				cp config/git-hooks/pre-commit .git/hooks/

				echo "\n\n${bold}${attention}Exiting. The pre-commit hook has changed and has been updated. Please try to commit again.${normal}"

				exit 1
			fi
		fi

		cp config/git-hooks/pre-commit .git/hooks/
		chmod +x .git/hooks/pre-commit
	fi

fi
