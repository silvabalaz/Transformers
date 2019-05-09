# Transformers

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Creating basic views 

**Welcome, Transformers List, Transformer Add, Transformer Edit**

### Transformer List

Includes a list of all transformers. You can create a new one, and for filtering it is necessary to determine each of its faction properties.
It is also possible to search the transformer by name.

### Transformer Add/Edit

Similar logic is needed to add a new transformer or change the existing one. So I decided to use one component that depending on whether the property **create** *true* or *false* will call the *createTransformer* or *updateTransformer* method on action *Save*.The form name is determined in the *displayTransformer* method, depending on the name of Transformer. If a new transformer is created, its name is *New* which can be modified and saved.

**Screenshots**

![ekran1].(https://raw.githubusercontent.com/silvahaberl/Transformers/master/welcome.png)
![ekran2].(https://raw.githubusercontent.com/silvahaberl/Transformers/master/transformerlist.png)
