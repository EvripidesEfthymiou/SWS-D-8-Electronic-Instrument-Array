/* De Havilland Canada Dash 8 Electronic Instrument Array (EIA) v1.0. Created by Evripides E. Efthymiou for SimWorks Studios Ltd., 2026 */

import { ComponentProps, FSComponent, DisplayComponent, VNode, EventBus, Subscribable, ConsumerSubject } from '@microsoft/msfs-sdk';

interface SWSDH8AEIAProps extends ComponentProps {
    bus: EventBus;
}

export interface ComponentEvents {
}

export class SWSDH8AEIADisplay extends DisplayComponent<SWSDH8AEIAProps> {
    constructor(props: SWSDH8AEIAProps) {
        super(props);
        const subscriber = props.bus.getSubscriber<ComponentEvents>();
    }

    public render(): VNode {
        return (
            <>
                <div id='ΕΙΑReadoutsContainer'>
                    <div id='gasGeneratorSpeed1Readout'></div>
                    <div id='torqueIndicator1Readout'></div>
                    <div id='torqueIndicator2Readout'></div>
                    <div id='gasGeneratorSpeed2Readout'></div>
                    <div id='fuelFlow1Readout'></div>
                    <div id='propellerRPM1Readout'></div>
                    <div id='propellerRPM2Readout'></div>
                    <div id='fuelFlow2Readout'></div>
                    <div id='ITT1Readout'></div>
                    <div id='ITT2Readout'></div>
                </div>
                <div id='developmentGridContainer'>
                    <svg id="developmentGrid" height="1024" width="1024">
                        <line x1="100" y1="0" x2="100" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="200" y1="0" x2="200" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="300" y1="0" x2="300" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="400" y1="0" x2="400" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="500" y1="0" x2="500" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="600" y1="0" x2="600" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="700" y1="0" x2="700" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="800" y1="0" x2="800" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="900" y1="0" x2="900" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="1000" y1="0" x2="1000" y2="1024" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="100" x2="1024" y2="100" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="200" x2="1024" y2="200" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="300" x2="1024" y2="300" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="400" x2="1024" y2="400" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="500" x2="1024" y2="500" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="600" x2="1024" y2="600" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="700" x2="1024" y2="700" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="800" x2="1024" y2="800" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="900" x2="1024" y2="900" style="stroke:rgb(0,255,0);stroke-width:2" />
                        <line x1="0" y1="1000" x2="1024" y2="1000" style="stroke:rgb(0,255,0);stroke-width:2" />

                        {/* <line x1="700" y1="0" x2="700" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" />
						<line x1="701" y1="0" x2="701" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" />
						<line x1="702" y1="0" x2="702" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" />
						<line x1="703" y1="0" x2="703" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" />
						<line x1="704" y1="0" x2="704" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" />
						<line x1="705" y1="0" x2="705" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" />
						<line x1="706" y1="0" x2="706" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" />
						<line x1="707" y1="0" x2="707" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" />
						<line x1="708" y1="0" x2="708" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" />
						<line x1="709" y1="0" x2="709" y2="1024" style="stroke:rgb(0,0,0);stroke-width:0.1" /> */}

                        <line x1="0" y1="437.5" x2="1000" y2="437.5" style="stroke:rgb(255,0,0);stroke-width:2" />
                        <line x1="500" y1="0" x2="500" y2="875" style="stroke:rgb(255,0,0);stroke-width:2" />
                        <line x1="0" y1="875" x2="1000" y2="875" style="stroke:rgb(255,0,255);stroke-width:2" />
                        <line x1="1000" y1="0" x2="1000" y2="875" style="stroke:rgb(255,0,255);stroke-width:2" />

                        <line x1="0" y1="727.1176" x2="1000" y2="727.1176" style="stroke:rgb(255,0,0);stroke-width:2" />
                        <line x1="501.5" y1="0" x2="501.5" y2="875" style="stroke:rgb(255,0,0);stroke-width:2" />
                    </svg>
                </div>
                <div id='debugContainer' loadingSequence='none' lastKeyPressed='none' pageMode='noChange'>
                    <div id='debugText' currentFontSizeMode='noChange' clearTextSequence='none'></div>
                    {/* <div id='debugText' currentFontSizeMode='noChange'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Integer ullamcorper malesuada odio. Morbi nunc odio, gravida at, cursus nec, luctus a, lorem. Maecenas tristique orci ac sem. Duis ultricies pharetra magna. Donec accumsan malesuada orci. Donec sit amet eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. Praesent lectus. Vivamus consectetuer hendrerit lacus. Curabitur blandit mollis lacus. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Fusce fermentum odio nec arcu. Vivamus euismod mauris. In ut quam vitae odio lacinia tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque ut diam. Integer adipiscing. Vivamus convallis felis vitae erat egestas varius. Proin ut turpis vitae justo condimentum sodales eget vel arcu. Suspendisse nec purus auctor, lacinia arcu in, tincidunt nisi. Integer vitae lacinia nunc. Sed vitae metus eget libero rhoncus placerat. Nullam sit amet leo in mi mattis maximus.</div> */}
                    {/* <div id='debugText' currentFontSizeMode='noChange'><p>Test1</p><p>Test2</p><p>Test3</p></div> */}
                </div>
            </>
        );
    }
}