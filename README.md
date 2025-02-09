## CLI instructions

### 1. Create cli config
create a `cli.json` file in the root of your project with the following structure:

```json
{
  "defaultPaths": {
    "components": {
      "global" : "app/components",
      "hotel" : "app/components/hotels",
      "str": "app/components/str",
      "car": "app/components/cars",
      "activity": "app/components/activities"
    },
    "page": "app/views/",
    "layout": "app/views/layouts"
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
cli g sc myComponent --hotel
cli g component booker --hotel --standalone

## Client side
cli generate client-component myComponent
cli g cc myComponent
```

### TODO: Create views, layouts


