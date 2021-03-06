#! /usr/bin/env node

// Upload grades from a CSV file to Canvas

var postGrades = require('./uploader.js');
var fs = require('fs');
var path = require('path');
var ArgumentParser = require('argparse').ArgumentParser;

// Handle Command Line Args
var parser = new ArgumentParser({
  version: '1.0.1',
  addHelp: true,
  description: 'This script uploads a CSV file to the specified Canvas course.',
  epilogue: 'THIS NEEDS TO BE WRITTEN...should describe process for getting a token.'
});

parser.addArgument(
    [ '-c', '--course-id' ],
    { 
        help: 'This is the Canvas ID of the course.',
        required: true
    }
);
parser.addArgument(
    [ '-a', '--assignment-id' ],
    {
        help: 'This is the Canvas ID of the assignment to post grades to.',
        required: true
    }
);
parser.addArgument(
    ['-f', '--file' ],
    {
        help: 'A CSV file of grades. It must include a "SID" column and a "Total Score" column.',
        required: true
    }
);
parser.addArgument(
    [ '-u', '--url' ],
    {
        help: 'Specify a URL of the Canvas instance to use.\n\tThis currently defaults to Berkeley bCourses.',
        defaultValue: 'https://bcourses.berkeley.edu/',
        required: false
    }
);
parser.addArgument(
    [ '-t', '--token' ],
    {
        help: 'An API token is required to upload scores. Use this option or export CANVAS_TOKEN.',
        defaultValue: process.env.CANVAS_TOKEN,
        required: process.env.CANVAS_TOKEN ? false : true
    }
); 
parser.addArgument(
    [ '-sid', '--student-id-format' ],
    {
        // TODO: Un-Berkeley-ify this option
        help: 'Canvas SIS id format. This currently defaults to "sis_user_id" which is used at UC Berkeley.' +
        '\nThis controls what ID options Canvas uses to find a student.',
        defaultValue: 'sis_user_id',
        choices: [
            '""',
            'sis_login_id',
            'sis_user_id'
        ],
        required: false
    }
);

// TODO: Header SID
// TODO: Header Grade

// Verify Args Exist
var ARG_VALS, gradesFile;

ARG_VALS = parser.parseArgs();

// Specify encoding to return a string
gradesFile = fs.readFileSync(ARG_VALS.file, { encoding: 'utf8'});

// TODO: make the callback be a more useful function.
postGrades(ARG_VALS, gradesFile, console.log);

