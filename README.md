# Blog
A user can create a new micro_post
A user can add an author to a micro_post when creating it
A user can show (ie, see) a given micro_post
A user can see all of the micro_posts as a feed (/feed)
A user can add a snippet - a link to a micro_post, similar to how Facebook handles links. it shows you some limited information about it, but clicking it will take you to the full article.
A user can add a "topic" or "hashtag" to a micro_post as a tag
This should be optional to do and the choice of tag is up to the user. Not having a tag for the post should NOT break the application.
Tags can be edited and deleted.
When a user creates a micro_post they can create a new author or choose a pre-existing one from a drop-down menu
A user can view an author's page that lists the micro_posts that they have created or edited
A user (author) will receive an email when a new micro_post is created or edited
This email should at least contain the title of the new micro_post
A user can view micro_posts posts by author (authors/authorhandle/posts)
A user can view micro_posts posts by tag (tag/tagname/posts)


Here is a link to TRELLO, where I manage the workflow:
https://trello.com/b/MFNwR505/project-one

Following NPM modules were used in creation of this masterpiece:
express
ejs
body-parser
method-Override
sqlite3
request

Generous thanks to Sendgrid for providing a free 400e-mail/day service. Their API lives here:
https://sendgrid.com/docs/API_Reference/Web_API/using_the_web_api.html


