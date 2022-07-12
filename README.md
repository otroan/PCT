# PCT Blog web pipeline

The blog uses static web pages generated by hugo. Content is written in markdown, that is combined with templates to generate html. 

The blog is hosted on github, with a github action triggering rebuilding the site on push events. 

The generated site is then deployed to S3 object storage.

I use an iPhone with the Working Copy app as a git client and Textastic as a markdown editor. 

## Photos

Photos are uploaded directly from my phone to S3 storage. Since the website generator uses the image filenames I have to upload the photos before pushing the post. There is a script running as part of the deploy process that fetches the filenames from S3. 

## The map

The map is created with OpenLayers. The PCT route is shown as an overlay from a static GPX file. There is another overlay showing where I am, based on periodically pulling a KML feed from Garmin Inreach.

## Improvements 

- [	] run the deploy scripts directly as github actions instead from VM
- [	] integrate with ststicman for comments