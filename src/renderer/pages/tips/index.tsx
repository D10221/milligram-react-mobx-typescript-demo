import * as React from "react";
import { Container, } from "milligrami/lib/container";
import { Title3 } from "milligrami/lib/headers";
import { Codes as Code } from "milligrami/lib/codes";
import { Description } from "milligrami/lib/description";
import { Row } from "milligrami/lib/row";
import { Column } from "milligrami/lib/column";
import { ButtonLinkFty } from "milligrami/lib/button-link-fty";

const SubHeader = (props: { text?: string } & React.HTMLProps<HTMLElement>) => (
    <p><strong>{props.text || props.children}</strong></p>
);
const HeadingFont = (props: React.HTMLProps<HTMLSpanElement>) => (
    // import style: TODO
    <span className="heading-font-size" {...props} />
);

const OUTLINE = "outline";
const CLEAR = "clear";
const BLACK = "black";
const LARGE = "large";

const ButtonLink = ButtonLinkFty();
const ButtonLinkOutline = ButtonLinkFty(OUTLINE);
const ButtonLinkClear = ButtonLinkFty(CLEAR);

const ButtonLinkBlack = ButtonLinkFty(BLACK);
const ButtonLinkBlackOutline = ButtonLinkFty(BLACK, OUTLINE);
const ButtonLinkBlackClear = ButtonLinkFty(BLACK, CLEAR);

const ButtonLarge = ButtonLinkFty(LARGE);
const ButtonLargeOutline = ButtonLinkFty(LARGE, OUTLINE);
const ButtonLargeOutClear = ButtonLinkFty(LARGE, CLEAR);

const Example = (props: React.HTMLProps<HTMLDivElement>) => (
    <div className="example" {...props} />
);

export const Page = () => (
    <Container>
        <Title3>Tips</Title3>
        <Description>
            Tips, techniques, and best practice on using Cascading Style Sheets.
        </Description>
        <SubHeader>Mobile First</SubHeader>
        <p>The Mobile First is the design strategy that takes priority development
             for mobile devices like smartphones and tablets.
            It means all styles outside of a media queries apply to all devices,
            then larger screens are targeted for enhancement.
        This prevents small devices
        from having to parse tons of unused CSS. Milligram use some breakpoints like these:</p>
        <Container>
            <Row>
                <ul>
                    <li>Larger than <strong>Mobile</strong>screen: 40.0rem
                            <HeadingFont>(640px)</HeadingFont>
                    </li>
                    <li>Larger than <strong>Tablet</strong>screen: 80.0rem
                            <HeadingFont>(1280px)</HeadingFont>
                    </li>
                    <li>Larger than <strong>Desktop</strong> screen: 120.0rem
                            <HeadingFont>(1920px)</HeadingFont>
                    </li>
                </ul>>
            </Row>
            <Code >{`
/* Mobile First Media Queries */

/* Base style
    { ... }
*/

/* Larger than mobile screen */
@media (min-width: 40.0rem) {
    /*... */
}

/* Larger than tablet screen */
@media (min-width: 80.0rem) {
    /*... */
}

/* Larger than desktop screen */
@media (min-width: 120.0rem) {
     /*... */
}
                `}</Code>
            <SubHeader>Embed Font</SubHeader>
            <p><strong>Milligram</strong> uses the <code>font-family</code>
                <a href="https://www.google.com/fonts/specimen/Roboto"
                    title="Roboto by Christian Robertson"
                    target="_blank"> Roboto</a>
                , created by
      <u>Christian Robertson</u>, and provided by Google. Customize your projects using
        <a href="https://fonts.google.com">Google Fonts</a>.
      To embed your selected fonts into a webpage, copy this code into the {"<head>"} of your HTML document.</p>
            <Code>{
                `/* Embed Font */
                <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto+Slab">

                    /* Use the following CSS rules to specify these families */
                    body {
                        font - family: 'Roboto Slab', serif;
                    }`
            }</Code>
            <SubHeader>Extending The Inheritances</SubHeader>
            <p>The style of an element
                    can be defined in several different locations, which interact in a complex way. It is this form
      of interaction makes CSS powerful, but it can make it confusing and difficult to debug.</p>
            <Example>
                <Row>
                    <Column>
                        <ButtonLink href="javascript: void(0)">Default .button</ButtonLink>
                        <ButtonLinkOutline href="javascript: void(0)">Outlined .button</ButtonLinkOutline>
                        <ButtonLinkClear href="javascript: void(0)">Clear .button</ButtonLinkClear>
                    </Column>
                    <Column>
                        <ButtonLinkBlack href="javascript: void(0)">.button-black</ButtonLinkBlack>
                        <ButtonLinkBlackOutline href="javascript: void(0)">.button-black</ButtonLinkBlackOutline>
                        <ButtonLinkBlackClear href="javascript: void(0)">.button-black</ButtonLinkBlackClear>
                    </Column>
                    <Column>
                        <ButtonLarge href="javascript: void(0)">.button-large</ButtonLarge>
                        <ButtonLargeOutline href="javascript: void(0)">.button-large</ButtonLargeOutline>
                        <ButtonLargeOutClear href="javascript: void(0)">.button-large</ButtonLargeOutClear>
                    </Column>
                </Row>
                <Code>{`
/* Extending The Inheritances */

/* Custom color */
.button-black {
  background-color: black;
  border-color: black;
}
.button-black.button-clear,
.button-black.button-outline {
  background-color: transparent;
  color: black;
}
.button-black.button-clear {
  border-color: transparent;
}

/* Custom size */
.button-small {
  font-size: .8rem;
  height: 2.8rem;
  line-height: 2.8rem;
  padding: 0 1.5rem;
}

.button-large {
  font-size: 1.4rem;
  height: 4.5rem;
  line-height: 4.5rem;
  padding: 0 2rem;
}`}</Code>
            </Example>
        </Container>
    </Container >
);