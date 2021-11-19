# Pull down a Jekyll base image (which uses ruby:2.7.1-alpine3.11)

# dev-stage
FROM jekyll/jekyll:4.0
RUN mkdir /site
RUN npm install --global gulp-cli
WORKDIR /site 

CMD gulp
