/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface EmbedComponent {
        "consumer": string;
        "data": object;
        "options": any;
        "request": Function;
        "submit": Function;
        "submitted": boolean;
    }
    interface LearnirExpModule {
        "component": string;
        "consumer": string;
    }
    interface QuizComponent {
        "consumer": string;
        "data": object;
        "options": any;
        "request": Function;
        "reset": Function;
        "submit": Function;
        "submitted": boolean;
    }
}
declare global {
    interface HTMLEmbedComponentElement extends Components.EmbedComponent, HTMLStencilElement {
    }
    var HTMLEmbedComponentElement: {
        prototype: HTMLEmbedComponentElement;
        new (): HTMLEmbedComponentElement;
    };
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
        "embed-component": HTMLEmbedComponentElement;
        "learnir-exp-module": HTMLLearnirExpModuleElement;
        "quiz-component": HTMLQuizComponentElement;
    }
}
declare namespace LocalJSX {
    interface EmbedComponent {
        "consumer"?: string;
        "data"?: object;
        "options"?: any;
        "request"?: Function;
        "submit"?: Function;
        "submitted"?: boolean;
    }
    interface LearnirExpModule {
        "component"?: string;
        "consumer"?: string;
    }
    interface QuizComponent {
        "consumer"?: string;
        "data"?: object;
        "options"?: any;
        "request"?: Function;
        "reset"?: Function;
        "submit"?: Function;
        "submitted"?: boolean;
    }
    interface IntrinsicElements {
        "embed-component": EmbedComponent;
        "learnir-exp-module": LearnirExpModule;
        "quiz-component": QuizComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "embed-component": LocalJSX.EmbedComponent & JSXBase.HTMLAttributes<HTMLEmbedComponentElement>;
            "learnir-exp-module": LocalJSX.LearnirExpModule & JSXBase.HTMLAttributes<HTMLLearnirExpModuleElement>;
            "quiz-component": LocalJSX.QuizComponent & JSXBase.HTMLAttributes<HTMLQuizComponentElement>;
        }
    }
}
