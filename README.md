## CLI instructions

### 1. Create cli config
create a `cli.json` file in the root of your project with the following props, `locationByFlag`, `flags`, `components`

```json
{
  "defaultPaths": {
    "locationByFlag": {
      "demo": "app/demo"
    },
    "flags": [
      "--demo"
    ],
    "components": "app/components"
  }
}
```

### Available commands

#### 1. Create a new component
Create server side components by default or client, `cc or client-component`

```bash
$ cli generate component <componentName> [productFlag, standaloneFlag]

# Example
## Server side
cli generate component myComponent
cli g c myComponent
cli g sc myComponent --shared
cli g component booker --category --standalone

## Client side
cli generate client-component myComponent
cli g cc myComponent
```

### TODO: Create views, layouts


