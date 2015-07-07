---
layout: blog
published: true
title: LocalFreeWeb
categories: blog
author: joseph_tanigawa
lead: Bringing the Web to those who can’t find it
---



If you couldn’t access the internet right now, how would you figure out where to go to get online? Maybe you would go to the library, but what if it’s closed? What if there's a long wait? Where would you go then?

Many organizations and institutions offer access to free, internet-enabled computers, but there is no way for someone to find these locations without being online already. In short, you need the internet to find the internet.

On August 15, Code for San Francisco, a Code for America brigade, launched <a href="http://LocalFreeWeb.org">LocalFreeWeb</a> to bring access to free, internet-enabled computers (not just Wi-Fi) to anyone who can send a text message. This effort to bring the benefits of the Web to low-income, mono-lingual, and other disadvantaged people is designed not only to give access to the Web, but also to generate interest among folks who might not know why they would use the internet in the first place. 



LocalFreeWeb was born out of a PARISOMA hackathon challenge to “help City organizations and corporations get involved the Sharing Economy”. Hackathon teammates Jesse Biroscak, Rachel Stanley, and others concluded that the most valuable thing organizations and corporations could do would be to bring access to the internet to all City residents - sharing their access to the knowledge on the web. They interviewed people in a rough part of the mid-Market / SOMA neighborhood to come up with the reasons why someone who does not use the internet might ever come online. The team tested the viability of the service by posting flyers in English and Spanish at nearbybus stops, presenting the benefits of the web (results of the user research), and proposing that people text a cell phone number (Jesse’s) for more information. The enthusiastic response confirmed the demand and the hackathon team soon brought the project to the Code for San Francisco brigade team to build a first version.

### How it works (summary)
Every bus stop in San Francisco has a bus stop identification number. When someone at a bus stop sends a text message to a specific phone number (as prompted by a flyer on the bus stop), including the bus stop identification number, they will receive a text message response with the locations of the 3 closest free, internet-enabled computers, as well as the current day's hours of avaliablilty of those locations. The message response also prompts them to ask for “Free Internet” when they arrive at the location. Locations are not only sourced from an established database of community centers and libraries, but also from the crowd - anyone can add their knowledge of a free, internet-enabled computer. 
![Photo of LocalFreeWeb text message](/images/blog/LocalFreeWebText.jpg)

### How it works (technical details)

LocalFreeWeb was built with CartoDB and Twilio. CartoDB stores a database of the locations providing free internet, along with all the relevant data about the location, such as address, phone number, hours, and geolocation (coordinates), as well as another database of all the bus stops in SF with their Stop ID and corresponding geolocation. Twilio handles the sending and receiving of text messages. 

To make these technologies work together, we created an app with Flask (a Python framework for web applications). When Twilio receives a text message from a user, the Flask app parses out the Stop ID from the message body and requests the geolocation of the Stop ID from CartoDB. With the received geolocation, the app makes another request to CartoDB asking for the three closest locations of free, internet-enabled computers to the bus stop's geolocation. Then it formats the metadata for the three closest locations into a readable text message and sends it back to the user.

We use the Google Spreadsheet API to record the date, time, and Stop ID of each valid request made to the app.

If you’re curious, here’s the <a href="https://github.com/sfbrigade/localfreeweb-sms-api">application backend code</a> and <a href="https://github.com/sfbrigade/localfreeweb.org/tree/gh-pages">frontend website code</a>.

### Technical Challenges

We discovered that the bus stop data (Stop ID) provided by the SFMTA was not stored in the database provided to the public. Not only is the database updated every three months, but Stop IDs are truncated by removing the leading digit for reasons unclear. For example, if the Stop ID at a bus stop is 13003, in SFMTA's database it will be stored as 3003. We realized this problem when we started testing the service - most of the stops weren’t in the database! Thankfully, we figured this out and made the necessary changes to the data.

## Next steps!

Now that we’ve built and tested this first version, we will be spreading the word to relevant City organizations and building relationships with Clear Channel Media, the company controlling the advertising space on bus shelters. Recently Allen and Joseph, Storytellers from the Brigade, enthusiastically set off with a stack of flyers and a roll of tape. They found willing recipients at the SF Library Main Branch, which will be distributing flyers to all of the City’s libraries. They also met with public housing offices and community centers to distribute the flyers to low income citizens. We currently have fliers avaliable in English, Spanish & Mandarin. We hope to soon have our fliers translated into Tagalog as well.

### Plans include:
- Distributing more flyers
- Printing stickers
- Creating partnerships with digital literacy organizations
- Finalizing a partnership with Clear Channel Media
- More outreach to relevant community organizations
- Converting the text messaging app into at least Spanish, Mandarin & Tagalog
- Partnering with MTA to have signs permanently placed at Wave Shelters explaining how to use our service 
- Acquiring funding for a shortcode ie; 311 for finding 'Free Internet' locations


### How you can help

1. Go to <a href="http://LocalFreeWeb.org">LocalFreeWeb.org</a> and let us know how/if it works!
2. Use the form on the website to add more locations
3. Print out <a href="https://drive.google.com/file/d/0B3Rg0E6TFEMCZGRGS1BtbzZxWjg/edit?usp=sharing">fliers</a> and post them near bus stops in your neighborhood
4. Check out the code and make suggestions
5. Use the open source code to build a version for your city (and tell us about it!)

If you’re in San Francisco and interested in helping build LocalFreeWeb, we’d love to see you at <a href="http://www.meetup.com/Code-for-San-Francisco-Civic-Hack-Night/">Code for San Francisco civic hack nights</a>. 

### We need people with all types of skills:
- Writing
- Marketing
- Business Development
- Research
- Code (Python, JavaScript, HTML, CSS)
- User Experience and User Interface Designers
