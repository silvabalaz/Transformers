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
              displayTransformer(transformer: Trans): void {
                  // Set the local transformer property
                  this.transformer = transformer;
                  // Reset the form back to pristine
                  this.transformerForm.reset();
                  // Display the appropriate page title
                  if (this.transformer) {
                   **if (this.transformer.name === 'New') {
                      this.pageTitle = 'Add Transformer';
                      this.create = true;
                    } else {
                      this.pageTitle = `Edit Transformer: ${this.transformer.name}`;
                    }**
                    this.transformerForm.patchValue({
                      name: this.transformer.name,
                      vehicleGroup: this.transformer.vehicleGroup,
                      vehicleType: this.transformer.vehicleType,
                      vehicleModel: this.transformer.vehicleModel,
                      gear: this.transformer.gear,
                      status: this.transformer.status,
                      faction: this.transformer.faction
                    });
                  }
                }

**Screenshots**

![ekran1].(https://raw.githubusercontent.com/silvahaberl/Transformers/master/welcome.png)
![ekran2].(https://raw.githubusercontent.com/silvahaberl/Transformers/master/transformerlist.png)
