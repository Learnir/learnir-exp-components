/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface LearnirExpModule {
        "component": string;
        "consumer": string;
    }
    interface QuizComponent {
        "consumer": string;
        "data": object;
        "options": any;
        "request": Function;
        "submit": Function;
        "submitted": boolean;
    }
}
declare global {
    interface HTMLLearnirExpModuleElement extends Components.LearnirExpModule, HTMLStencilElement {
    }
    var HTMLLearnirExpModuleElement: {
        prototype: HTMLLearnirExpModuleElement;
        new (): HTMLLearnirExpModuleElement;
    };
    interface HTMLQuizComponentElement extends Components.QuizComponent, HTMLStencilElement {
    }
    var HTMLQuizComponentElement: {
        prototype: HTMLQuizComponentElement;
        new (): HTMLQuizComponentElement;
    };
    interface HTMLElementTagNameMap {
        "learnir-exp-module": HTMLLearnirExpModuleElement;
        "quiz-component": HTMLQuizComponentElement;
    }
}
declare namespace LocalJSX {
    interface LearnirExpModule {
        "component"?: string;
        "consumer"?: string;
    }
    interface QuizComponent {
        "consumer"?: string;
        "data"?: object;
        "options"?: any;
        "request"?: Function;
        "submit"?: Function;
        "submitted"?: boolean;
    }
    interface IntrinsicElements {
        "learnir-exp-module": LearnirExpModule;
        "quiz-component": QuizComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "learnir-exp-module": LocalJSX.LearnirExpModule & JSXBase.HTMLAttributes<HTMLLearnirExpModuleElement>;
            "quiz-component": LocalJSX.QuizComponent & JSXBase.HTMLAttributes<HTMLQuizComponentElement>;
        }
    }
}
