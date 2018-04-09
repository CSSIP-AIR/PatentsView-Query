﻿<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Thank you!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Thank You!" />
    <meta name="author" content="AIR" />
    <!--<link href='//fonts.googleapis.com/css?family=Open+Sans:300,400,400italic,600,700,800%7CRoboto+Slab:400,700' rel='stylesheet' type='text/css'>-->
    <link rel="stylesheet" href="http://www.patentsview.org/web/css/headfoot.css" />
    <link rel="stylesheet" href="http://www.patentsview.org/querydev/assets/css/font-awesome.min.css" />
    <link rel="stylesheet" href="http://www.patentsview.org/querydev/assets/css/pvqt.css" />
</head>
<body>
<?php
    error_reporting(E_ALL);
    echo pclose(popen('start /B php.exe "C:/querytool/backend.php" 2>nul >nul', "r")); 
    
    ?>
    <noscript>This search tool requires Javascript. For more information about finding a particular patent or group of patents please visit <a 

href="http://uspto.gov/" title="United States Patent and Trademark Office Website">www.uspto.gov</a> or call our customer support at <a href="tel:1-800-786-9199" 

title="USPTO Customer Support Toll-Free Phone Number">1-800-786-9199</a>.</noscript>
    <header class="med-header">
        <div class="centered-header">
            <a href="/" class="logo" title="PatentsView - USPTO" alt="PatentsView Logo"></a>
            <nav>
                <ul>
                    <li class="api"><a href="#">API</a><div class="nav-tooltip">provides developers and researchers programmatic access to the underlying 

data</div></li>
                    <li class="data-query active"><a href="#">Data Query</a><div class="nav-tooltip">provides a graphical interface for researchers to query the 

entire underlying database</div></li>
                    <li class="data-download"><a href="#">Data Download</a><div class="nav-tooltip">provides downloadable tables as csv files covering the 

underlying database</div></li>
                </ul>
            </nav>
        </div>
    </header>
    <!-- Container -->
    <section id="step-by-step-container" class="container"></section>
    <!-- /Container -->
    <section class="container">
        <!-- form action buttons -->
        <div class="col-md-12">
            <h1 class="thankyou">Thank you</h1>
            <p class="step-desc">Your Query has been successfully submitted. <br />Your results will be emailed to you within 24 hours.</p>
            <a href="http://www.patentsview.org/querydev" class="prev-next-btn btn btn-lg btn-primary" title="Begin New Query">Begin New Query <i class="fa fa-

caret-right"></i></a>
        </div>
    </section>
    <!-- form action buttons -->
    <footer class="thin-footer">
        <div>
            <p>© 2014</p>
            <nav>
                <ul>
                    <li class="about"><a href="#" title="About">About</a></li>
                    <li class="methods"><a href="#" title="Methods and Sources">Methods and Sources</a></li>
                    <li class="feedback"><a href="#" title="Send Feedback">Send Feedback</a></li>
                    <li class="glossary"><a href="#" title="Glossary">Glossary</a></li>
                </ul>
            </nav>
        </div>
    </footer>
</body>
</html>