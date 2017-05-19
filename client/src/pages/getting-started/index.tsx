import * as React from "react";
import { Container, } from "milligrami/lib/container";
import { Title3 } from "milligrami/lib/headers";
import { Codes as Code } from "milligrami/lib/codes";
import { Description } from "milligrami/lib/description";
import { ButtonLinkDownload as Download } from "milligrami/lib/button-link-download";

const installHtml = require("raw-loader!./install-html.html");
const tree = require("raw-loader!./tree.md");
const SubHeader = (props: { text?: string } & React.HTMLProps<HTMLElement>) => (
    <p><strong>{props.text || props.children}</strong></p>
);
export const Page = () => (
    <Container>
        <Title3>GettingStarted</Title3>
        <Description>
            There are some ways to get started. First, see all download options available below,
            then choose the most suitable option
            for your need. Now you should add the main file of
            the Milligram and the CSS Reset in the header of your project.
        Just that!
        </Description>
        <p><Download href="https://github.com/milligram/milligram/archive/master.zip"
            title="Download Milligram">
            Download Milligram</Download></p>
        <Container>
            <SubHeader>Install with Bower</SubHeader>
            <p>Milligram is available to install using Bower.</p>
        </Container>
        <Container>
            <Code>$ bower install milligram</Code>
            <SubHeader>Install with npm</SubHeader>
            <p>Milligram is also available to install using npm.</p>
            <Code>$ npm install milligram</Code>
            <SubHeader>Install with Yarn</SubHeader>
            <p>Milligram is also available to install using Yarn.</p>
            <Code>$ yarn add milligram</Code>
            <SubHeader>What's included</SubHeader>
            <p>Once downloaded,
                extract the compressed folder to see the main file in the uncompressed and minified version.</p>
        </Container>
        <Code >{tree}</Code>
        <SubHeader>Usage</SubHeader>
        <p>First, use any method mentioned above to download Milligram. Then, just add these tags in the head. Milligram
            is also available via
            <a href="https://cdnjs.com/libraries/milligram"
                title="Milligram is also available via CDN"
                target="_blank"> CDN</a>.</p>
        <Code>{installHtml}</Code>
        <SubHeader>CLI</SubHeader>
        <p>A CLI for getting started with Milligram. It offers a super simple boilerplate project with Milligram.</p>
        <Code>
            $ npm install -g milligram-cli
        </Code>
        <p>Create a new app using the command
            <code>milligram init</code>
            , then install dependencies and run with <code>npm start</code>.</p>
        <Code>{`
$ milligram init new_app
$ cd new_app
$ npm start`
        }</Code>
    </Container >
);