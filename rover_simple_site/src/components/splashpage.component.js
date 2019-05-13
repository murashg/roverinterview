import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class SplashPage extends Component{
  render() {
    return (
      <div>
        <Paper>
          <Typography white-space='nowrap'>
            <h1>SplashPage</h1>
            <h3>
              Look at sitters, owners or appointments, Login to owner or create a new one.  Then you can create an appointment with sitter via Sitter list.
            </h3>
            <p>##Reflection</p>
            <p>Crunch.  And a very good learning experience on what I need to improve.</p>
            <p/>
            <p>In the last 6 months I have really been programming applications and personal projects in Java and Kotlin.  Besides the
            web apps that I created and the minor ones that were not as in-depth this is the first larger fullstack website I have made in the
            last 4 years.  Implementing the front and backend in 2 weeks has been a large undertaking and getting back into Javascript has ment
            that most of this was trial by fire.  From not having any JCSS loading to getting Parent Child relationships with React, my code went through so many iterations that if I was to do it again I would start from scratch.  However I got most functionality working moderately, there are still quite a few bugs, but I am out of time and still happy with what I got done with in the timeframe, it is a base protoype.
            </p>
            <p/>
            <p>I would like to completely redo the website again using what I know now, and will most likely keep working on it as a learning tool.  I would instead move the entire backend to AWS (which I should have done from the start) using dynamodb and lambda functions with API gateway as my middleware.  Have React being statically hosted on S3.  Then use mocha for testing and a continuous integration pipeline through AWS Pipeline and AWS Build to sync up whenever I upload to Github, using webpack to build.  I didn't think that getting the prototype working would take my entire time.  All in all, it was a good experience and I feel like I now am much more comfortable with React, Node, Express and Mongo.  However if moving forward I only have to use React I would be a happy camper.
            </p><p/>
            <p>I really would like to work at Rover, and think that I would fit nicely in a SDE 1 position.  I am really attracted to your culture and think that with the proper guidance I will become a fullstack powerhouse.  lol
            </p><p/>
            <p>Cheers,</p>
            <p>Greg</p>
            <br/>
            <p>## Ideas</p>
            <p>Would be best if owner and sitter interact through website.  Not sure if displaying phone or email are good ideas.</p>
            <p>Sitter list should have slider to choose how many to search, and should load 10 at a time.</p>
            <p>I like the idea of swipeable tabs for ui with a changing button.</p>
            <p>Create appointment could be a form dialog.</p>
            <p>Mobile first.</p>
            <p>sitter collection is indexed on overall rating.</p>
            <br/>
            <p>##Won't get to</p>
            <p>-sanitizing inputs</p>
            <p>-ui improvements</p>
            <p>-ux improvements</p>
            <p>  -bottom button that changes use depending on components</p>
            <p>  -frontend for particular owner/sitter/appointment</p>
            <p>-still have css bugs</p>
            <p>-finishing kotlin jar to read input</p>
            <p>  -add loading bar to db initialization</p>
            <p>-search functionality improvements (right now only searches owner collection.)</p>
            <p>  -best way would be to use a 3rd party library like elasticache or algolia)</p>
            <p>  -rather than searching onChange, search on 'enter' or clicking icon</p>
            <p>-port to AWS, rework backend to use serverless stack.  Should have done that from the beginning.</p>
            <p>-implement test framework</p>
            <p>-comment out components</p>
            <p>-remove prototype code</p>
            <p>-remove console.logs used for debugging</p>
            <br/>
            <p>##Site UX flow</p>
            <p>Owner logs in.  Then can look at past appointments or choose to look at sitters or schedule new appointment
            From sitter list owner can look at image, name, and rating of top sitters, upon clicking will bring up text of sitter. can then create appointment with sitter.</p>
            <br/>
            <p>##Todo</p>
            <p>Core Functionality ~60%</p>
            <p>TESTING ~0%</p>
            <p>UI/UX thought ~50%</p>
            <p>Abstracting ~25%</p>
            <p>Optimization ~60%</p>
            <br/>
          </Typography>
        </Paper>
      </div>
    )
  }
}
