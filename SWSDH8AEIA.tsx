/* De Havilland Canada Dash 8 Electronic Instrument Array (EIA) v1.0. Created by Evripides E. Efthymiou for SimWorks Studios Ltd., 2026 */

/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Instruments/Shared/BaseInstrument" />
/// <reference types="@microsoft/msfs-sdk" />
/// <reference types="@microsoft/msfs-types" />
import { FSComponent, DisplayComponent, VNode, EventBus, MapSystemBuilder, MapSystemKeys, BingComponent, Vec2Subject, UnitType, GeoPoint, MapWxrModule, ClockPublisher, InstrumentBackplane, GNSSPublisher, RadioType, BitFlags, IntersectionType, KeyEventManager, KeyEvents } from '@microsoft/msfs-sdk';
import { SWSDH8AEIADisplay, ComponentEvents } from './SWSDH8AEIADisplay';
import { SevenSegmentReadout } from 'sws-seven-segment-lcd';
import { getElementSize, getElementWidth, getElementHeight, getSimvarFromElement, isNullOrWhitespace, round, clamp, normalizeNumberStringLength, getRotationAroundPointTransformationMatrix, get3DTransformationString } from './SWSDH8AEIAUtils';


const eventBus = new EventBus();
// const manager = await KeyInterceptManager.getManager(eventBus);

class SWSDH8AEIA extends BaseInstrument {
    get templateID(): string {
        return 'SWSDH8AEIA';
    }

    private SWSConfiguration: Element | undefined;
    private instrumentEnable: boolean = false;
    private timeNow: number = (SimVar.GetSimVarValue("E:SIMULATION TIME", "seconds") * 1000); //Time since simulation started in milliseconds  
    private debugMode: boolean = false;

    private gasGeneratorSpeed1Readout!: SevenSegmentReadout;
    private torqueIndicator1Readout!: SevenSegmentReadout;
    private torqueIndicator2Readout!: SevenSegmentReadout;
    private gasGeneratorSpeed2Readout!: SevenSegmentReadout;
    private fuelFlow1Readout!: SevenSegmentReadout;
    private propellerRPM1Readout!: SevenSegmentReadout;
    private propellerRPM2Readout!: SevenSegmentReadout;
    private fuelFlow2Readout!: SevenSegmentReadout;
    private ITT1Readout!: SevenSegmentReadout;
    private ITT2Readout!: SevenSegmentReadout;
    private lastTick: number = Date.now();

    public connectedCallback(): void {
        super.connectedCallback();
        FSComponent.render(<SWSDH8AEIADisplay bus={eventBus} />, document.getElementById('InstrumentContent'));
    }

    public async onInteractionEvent(_args: string[]): Promise<void> {
        const hEventName = _args[0];
        console.log(`Got a H Event named ${hEventName}`);
    }

    protected Init(): void {
        super.Init();
        this.parseXMLConfig();
        document.getElementById("developmentGridContainer")!.style.visibility = "hidden";

        this.gasGeneratorSpeed1Readout = new SevenSegmentReadout(document.getElementById('gasGeneratorSpeed1Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 1, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color          
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        this.gasGeneratorSpeed1Readout.setDigitGhost(0, "1.");
        this.gasGeneratorSpeed1Readout.setValue(155.5);

        this.torqueIndicator1Readout = new SevenSegmentReadout(document.getElementById('torqueIndicator1Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 1, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color           
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        this.torqueIndicator1Readout.setDigitGhost(0, "1.");
        this.torqueIndicator1Readout.setValue(155.5);

        this.torqueIndicator2Readout = new SevenSegmentReadout(document.getElementById('torqueIndicator2Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 1, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        this.torqueIndicator2Readout.setDigitGhost(0, "1.");
        this.torqueIndicator2Readout.setValue(155.5);

        this.gasGeneratorSpeed2Readout = new SevenSegmentReadout(document.getElementById('gasGeneratorSpeed2Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 1, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        this.gasGeneratorSpeed2Readout.setDigitGhost(0, "1.");
        this.gasGeneratorSpeed2Readout.setValue(155.5);

        this.fuelFlow1Readout = new SevenSegmentReadout(document.getElementById('fuelFlow1Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 0, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        // this.fuelFlow1Readout.setDigitGhost(0, "1.");
        this.fuelFlow1Readout.setValue(1555);

        this.propellerRPM1Readout = new SevenSegmentReadout(document.getElementById('propellerRPM1Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 0, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        this.propellerRPM1Readout.setDigitGhost(0, "1.");
        this.propellerRPM1Readout.setValue(1888);

        this.propellerRPM2Readout = new SevenSegmentReadout(document.getElementById('propellerRPM2Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 0, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        this.propellerRPM2Readout.setDigitGhost(0, "1.");
        this.propellerRPM2Readout.setValue(1888);

        this.fuelFlow2Readout = new SevenSegmentReadout(document.getElementById('fuelFlow2Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 0, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        // this.fuelFlow2Readout.setDigitGhost(0, "1.");
        this.fuelFlow2Readout.setValue(1355);

        this.ITT1Readout = new SevenSegmentReadout(document.getElementById('ITT1Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 0, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        this.ITT1Readout.setDigitGhost(0, "1.");
        this.ITT1Readout.setValue(1455);

        this.ITT2Readout = new SevenSegmentReadout(document.getElementById('ITT2Readout')!,
            {
                digits: 4, // number of digit cells (required)
                style: 'sws_d8_EIA2', // 'classic' | 'block' | 'slim' | your own
                decimals: 0, // fixed decimal places
                digitHeight: 250, // px height of each digit ("font size")
                color: '#f2f2f2', // lit color; omit to inherit CSS color
                offColor: "#282828",
                offOpacity: 0.1,
                overflow: "blank",
                gap: -15
            }
        );
        this.ITT2Readout.setDigitGhost(0, "1.");
        this.ITT2Readout.setValue(1555);
    }

    public onPowerOn(): void {
        super.onPowerOn();
    }

    public onShutDown(): void {
        super.onShutDown();
    }

    parseXMLConfig(): void {
        super.parseXMLConfig();
        if (this.instrumentXmlConfig) {
            this.SWSConfiguration = this.instrumentXmlConfig.getElementsByTagName("Configuration")[0];
        }
    }

    private updateXMLVariables(): void {
        if (this.SWSConfiguration) {
            try {
                // this.instrumentEnable = getSimvarFromElement(this.SWSConfiguration.getElementsByTagName("InstrumentPowerSource")[0]);
                // this.attitudeDatasource = getSimvarFromElement(this.SWSConfiguration.getElementsByTagName("Datasource")[0]);
                // console.log("enable: " + this.instrumentEnable);
                // console.log("datasource: " + this.attitudeDatasource);
            }
            catch (e) {
                console.log("SWS XML variable parsing error.");
                console.dir(e);
            }
        }
    }

    public Update(): void {
        super.Update();
        this.updateXMLVariables();
        // this.errorCatch("test");

        // if (this.isElectricityAvailable()) {
        if (true) {
            // document.getElementById("InstrumentContent")!.style.visibility = "visible";
            // document.getElementById("InstrumentContent")!.style.opacity = "1";
            if (Date.now() - this.lastTick > 200) {
                let gasGeneratorSpeedPercent1: number = Number(SimVar.GetSimVarValue("L:1:TURB_ENG_NH_1", "percent"));
                gasGeneratorSpeedPercent1 = round(gasGeneratorSpeedPercent1, 1);
                this.gasGeneratorSpeed1Readout.setValue(gasGeneratorSpeedPercent1);
                let torquePercent1: number = Number(SimVar.GetSimVarValue("TURB ENG MAX TORQUE PERCENT:1", "percent"));
                torquePercent1 = round(torquePercent1, 1);
                this.torqueIndicator1Readout.setValue(torquePercent1);
                let torquePercent2: number = Number(SimVar.GetSimVarValue("TURB ENG MAX TORQUE PERCENT:2", "percent"));
                torquePercent2 = round(torquePercent2, 1);
                this.torqueIndicator2Readout.setValue(torquePercent2);
                let gasGeneratorSpeedPercent2: number = Number(SimVar.GetSimVarValue("L:1:TURB_ENG_NH_2", "percent"));
                gasGeneratorSpeedPercent2 = round(gasGeneratorSpeedPercent2, 1);
                this.gasGeneratorSpeed2Readout.setValue(gasGeneratorSpeedPercent2);
                let fuelFlowPPH1: number = Number(SimVar.GetSimVarValue("TURB ENG FUEL FLOW PPH:1", "pounds per hour"));
                fuelFlowPPH1 = round(fuelFlowPPH1, 0);
                this.fuelFlow1Readout.setValue(fuelFlowPPH1);
                let propellerRPM1: number = Number(SimVar.GetSimVarValue("PROP RPM:1", "rpm"));
                propellerRPM1 = round(propellerRPM1, 0);
                this.propellerRPM1Readout.setValue(propellerRPM1);
                let propellerRPM2: number = Number(SimVar.GetSimVarValue("PROP RPM:2", "rpm"));
                propellerRPM2 = round(propellerRPM2, 0);
                this.propellerRPM2Readout.setValue(propellerRPM2);
                let fuelFlowPPH2: number = Number(SimVar.GetSimVarValue("TURB ENG FUEL FLOW PPH:2", "pounds per hour"));
                fuelFlowPPH2 = round(fuelFlowPPH2, 0);
                this.fuelFlow2Readout.setValue(fuelFlowPPH2);
                let ITTCelsius1: number = Number(SimVar.GetSimVarValue("TURB ENG ITT:1", "celsius"));
                ITTCelsius1 = round(ITTCelsius1, 0);
                this.ITT1Readout.setValue(ITTCelsius1);
                let ITTCelsius2: number = Number(SimVar.GetSimVarValue("TURB ENG ITT:2", "celsius"));
                ITTCelsius2 = round(ITTCelsius2, 0);
                this.ITT2Readout.setValue(ITTCelsius2);
                this.lastTick = Date.now();
            }
        }
        else {
            // document.getElementById("InstrumentContent")!.style.visibility = "hidden";
            // document.getElementById("InstrumentContent")!.style.opacity = "0";
        }
        this.timeNow = (SimVar.GetSimVarValue("E:SIMULATION TIME", "seconds")) * 1000;
    }

    private modifyElementByKeyboard(e: KeyboardEvent) {
        console.log(e);
        if (e.shiftKey) {
            let modifiedElement = document.getElementById("AVSSDisplayValueReadout");
            // modifiedElement!.setAttribute("mode", "altitudeSelect");
        }
        if (e.ctrlKey) {
            // let modifiedElement = document.getElementById("AVSSDisplayValueReadout");
            // modifiedElement!.setAttribute("mode", "verticalSpeedSelect");
            let modifiedElement = document.getElementById("debugContainer");
            let debugModeAttribute: string = modifiedElement!.getAttribute("active")!;
            if (debugModeAttribute == "true") {
                modifiedElement!.setAttribute("active", "false");
            }
            else {
                modifiedElement!.setAttribute("active", "true");
            }
            modifiedElement!.setAttribute("lastKeyPressed", "CTRL");
        }
        if (e.altKey) {

        }
        if (e.which == 68) {    //Letter D
            document.getElementById("debugText")!.setAttribute("currentFontSizeMode", "decrease");
        }
        if (e.which == 69) {    //Letter E
            document.getElementById("debugText")!.setAttribute("currentFontSizeMode", "increase");
        }
        if (e.which == 70) {    //Letter F
            document.getElementById("debugContainer")!.setAttribute("pageMode", "nextPage");
        }
        if (e.which == 81) {    //Letter Q

        }
        if (e.which == 82) {    //Letter R
            document.getElementById("debugContainer")!.setAttribute("pageMode", "previousPage");
        }
        if (e.which == 86) {    //Letter V
            // document.getElementById("debugContainer")!.style.backgroundColor = "green";
        }
        if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122)) {
            document.getElementById("debugContainer")!.setAttribute("lastKeyPressed", String.fromCharCode(e.keyCode));
        }
    }
}
registerInstrument('sws-dh8a-eia', SWSDH8AEIA);