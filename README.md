# foodwithfriends :green_salad:

Circle CI Build Status: [![Food with Friends](https://circleci.com/gh/software-students-fall2021/project-setup-foodwithfriends.svg?style=svg)](https://circleci.com/gh/software-students-fall2021/project-setup-foodwithfriends)

Check out the website at [foodwithfriends.tech](http://foodwithfriends.tech/)

![Food with Friends Banner](./front-end/src/img/about-banner.jpg)

Are you going out to eat with friends anytime soon? These friendly gatherings usually go one of two ways: a restaurant is agreed upon fairly quickly or you spend 30+ minutes choosing what to eat in the first place (not including the actual restaurant you are going to).

foodwithfriends is a web application that aims to make decision-making for where to eat easy. Users can invite their entourage to a "room" where they can choose a cuisine they prefer (e.g. Italian, Chinese, etc.), vote on it, and go on to choose a restaurant together.

Instead of wasting time deciding on what and where to eat, foodwithfriends allows you and your friends to share a meal instantly.

## Product Vision Statement

Our goal is to help groups of people choose a dining spot so that more time is spent on being together than deciding on where and what to eat. To accomplish this, our MVP should allow users to create/join group spaces, vote on a cuisine and view the results, add preferred dishes related to the cuisine, and view the list of recommended restaurants in descending order (from most recommended to least, based on user preferences).

## Core Team Members

<table>
  <tr>
    <td align="center"><a href="https://github.com/Jen-Lopez"><img src="https://avatars.githubusercontent.com/u/21044058?s=400&u=ba065b3d40eb24aabc9097b14cf78c2f504adc52&v=4" width="100px;" alt=""/><br /><sub>   <b>Jennifer Lopez</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/psc358"><img src="https://avatars.githubusercontent.com/u/52253078?v=4" width="100px;" alt=""/><br /><sub><b>Priya Chaganti</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Golemwardox"><img src="https://avatars.githubusercontent.com/u/71036353?v=4" width="100px;" alt=""/><br /><sub><b>Sri Kaushik</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/tanyasingh7"><img src="https://avatars.githubusercontent.com/u/60750284?v=4" width="100px;" alt=""/><br /><sub> <b>Tanya Singh</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/thomastai1666"><img src="https://avatars.githubusercontent.com/u/36852809?v=4" width="100px;" alt=""/><br /><sub><b>Thomas Tai</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/yunko1803"><img src="https://avatars.githubusercontent.com/u/35706156?v=4" width="100px;" alt=""/><br /><sub><b>Yoon Koh</b></sub></a><br /></td>
  </tr>
</table>

## History

The project is proposed by [@Jen-Lopez](https://github.com/Jen-Lopez) for the Agile Development Course. She has always wanted to work on a restaurant finder application **for groups**, as she herself is a picky eater. There are many times where she has held up her own friend group in making decisions on where to eat. So hopefully by building this application, other picky eaters, those with dietary restrictions, or with specific cravings can find somewhere to eat relatively quick and easily.

## Contribution Guidelines

If you would like to contribute to our project, we recommend you to checkout our [Contributing Guidelines](./CONTRIBUTING.md). Feel free to fork the project and send us a pull request.

## Installation & Setup

Check out our [Installation Guide](./INSTALLATION.md) to setup your local development environment.

### Extra credit opportunities

Please note that we have attempted the extra credit.

We have attempted the extra credit by deploying to a Docker container. Please see the docker section of installation and setup guide for more details.

We have also attempted the extra credit using Continuous Deployment setup. On each commit to master, Circle CI will attempt to SSH
into the server and run a script. The script will pull the latest repository changes, then build the docker container. Finally, each container will install dependencies and run the frontend on ports 80 and backend on port 8000.

See below for deploy.sh script:

```
#!/bin/bash

#path of your project on the VPS
cd ~/project-setup-foodwithfriends

#pull from the branch
git pull origin master

#kill all running docker containers
docker kill $(docker ps -q)

#go to frontend directory
cd front-end

# followed by instructions specific to your project that you used to do manually
docker run --rm -d -p 80:3000 $(docker build -q .)

cd ../back-end

docker run --rm -d -p 8000:8000 $(docker build -q .)
```

## Additional Documentation

- [Project Proposal](https://github.com/software-students-fall2021/project-proposal-jennifer-lopez)
- [App Map and Wireframes](https://github.com/software-students-fall2021/user-experience-design-tanya-singh)
