## Simple Webpack loader that replace strings

### webpack.config.js Example
```
module: {
    test: /.ext$/,
    loader: 'bigboiloader'
    options {
        replace: /{regex}/,
        with: '{some string}'
    }
}
```

