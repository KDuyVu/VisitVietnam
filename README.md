a

 Visit VietNam

This is a project to help visitors from everywhere to visit VietNam more ... efficiently?

  

# How to run code:

1. Install Angular (skip to step 2 if you've already had angular on your machine)
https://angular.io/guide/setup-local
2. Clone the repo
	```
    $ git clone https://github.com/amdiethuong2/VisitVietnam
3. Run
   ```
   $ cd VisitVietnam && ng serve
4. Direct your browser to localhost:4200 and check it out

# Rules for collaborators:
1. Always use rebase, not merge (to keep the working tree clean). I recommend running the following command so that git pull always uses --rebase option
	```
	$ git config --global pull.rebase true
2. Always create a merge a new b ranch against the master branch to create a new feature
	```
	$ git checkout master
	$ git pull --rebase
	$ git checkout -b <your-branch-name-should-be-'VVN-X'>
	$ #Make changes
	$ git add .
	$ git commit -m "VVN-X: Commit-message-here"
	$ git push --set-upstream origin VVN-X
3. I also recommend create only one commit per branch. If you want to alter the changes, just do
	```
	$ git add .
	$ #if you don't want to change to commit message
	$ git commit --amend --no-edit
	$ #if you want to change the commit message
	$ git commit --amend
	$ git push -f
