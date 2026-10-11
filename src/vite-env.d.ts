/// <reference types="vite/client" />

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module './components/TechText' {
    const TechText: any;
    export default TechText;
}

declare module './components/TechText.jsx' {
    const TechText: any;
    export default TechText;
}

declare module './TechText' {
    const TechText: any;
    export default TechText;
}

declare module './TechText.jsx' {
    const TechText: any;
    export default TechText;
}
