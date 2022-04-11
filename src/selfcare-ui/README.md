# SelfCare-UI

___

## Icons
Adding New:

1. Add clean SVG to `/icons` (run it through [svomg](https://jakearchibald.github.io/svgomg/) or similar)
2. `npm run icons`
3. Add the new icon to `/components/Icon/Icons.stories.js`
4. Usage in a consuming app looks like:
```
import Icon[Name] from 'selfcare-ui/icons/react-icons/[name]'
<Icon[Name] />
```
