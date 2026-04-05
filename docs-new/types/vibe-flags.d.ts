import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vibe-flags-boolean": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          description?: string;
          value?: string;
          default?: boolean;
        },
        HTMLElement
      >;
      "vibe-flags-select": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          description?: string;
          default?: string;
          custom?: boolean;
        },
        HTMLElement
      >;
      "vibe-flags-option": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
        },
        HTMLElement
      >;
      "vibe-flags-toolbar": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          position?: string;
        },
        HTMLElement
      >;
    }
  }
}
