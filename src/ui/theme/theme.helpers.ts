import { mix } from 'polished';

interface Map<T> {
  [key: string]: T;
}

interface Theme {
  [key: string]: any | Map<string | number>;
}

const PIXELS_PER_REM = 16;

// Helper Functions
export const remToPx = (rem: number) => rem * PIXELS_PER_REM;
export const above = (breakpoint: string) => ({ theme }: Theme) => `(min-width: ${theme.breakpoints[breakpoint] + 1}px)`;
export const below = (breakpoint: string) => ({ theme }: Theme) => `(max-width: ${theme.breakpoints[breakpoint]}px)`;
export const tint = (color: any, percentage: string | number) => mix(percentage, '#fff', color);

// Variable Getters
export const font = (font: string) => ({ theme }: Theme) => theme.font[font];
export const lineHeight = (height: string, unit: string = 'rem') => ({ theme }: Theme) => `${theme.lineHeight[height]}${unit}`;
export const rhythm = (rhythm: string, unit: string = 'rem') => ({ theme }: Theme) => `${theme.rhythm[rhythm]}${unit}`;
export const buttonMinWidth = (button: string) => ({ theme }: Theme) => theme.buttonMinWidth[button];
export const spacing = (spacing: string, unit: string = 'rem') => ({ theme }: Theme) => `${theme.spacing[spacing]}${unit}`;
export const mediaContextSize = (size: string) => ({ theme }: Theme) => theme.mediaContextSize[size];
export const componentBoundaries = (boundary: string) => ({ theme }: Theme) => theme.componentBoundaries[boundary];
export const radius = (radius: string) => ({ theme }: Theme) => theme.radius[radius];
export const weight = (weight: string) => ({ theme }: Theme) => theme.weight[weight];
export const shadow = (shadow: string) => ({ theme }: Theme) => theme.shadow[shadow];
export const layer = (layer: string) => ({ theme }: Theme) => theme.layer[layer];
export const color = (colorName: string) => ({ theme }: Theme) => theme.color[colorName];
export const marketing = (group: string, subgroup: string) => ({ theme }: Theme) => theme.marketing[group][subgroup];
export const main = (group: string, subgroup: string) => ({ theme }: Theme) => theme.main[group][subgroup];
export const general = (group: string, subgroup: string) => ({ theme }: Theme) => theme.general[group][subgroup];
