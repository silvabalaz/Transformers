# Transformers

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Creating basic views 

**Welcome, Transformers List, Transformer Add, Transformer Edit**

### Transformer List

Includes a list of all transformers. You can create a new one, and for filtering it is necessary to determine each of its faction properties.
It is also possible to search the transformer by name.

I use Pipes for searching and filtering in html. I decided for Pipes because it was easy to use the Pipes in loops for all the transformers. And the logic for each operation should be extracted into a separate file (I already use a lot of filters in components for other functionalities). In my case *SearchPipe.ts* and *FilterPipe.ts* .

  
  
                  @Pipe ({ name : 'searchpipe'})
                      export class SearchPipe implements PipeTransform {
                        transform(transformers: Trans[], searchName: string): Trans[] {
                          if (!transformers || !searchName) {
                            return transformers;
                          }
                          return transformers.filter(items => items.name === searchName);
                        }
                      }

To filter Transformers by faction you have to set faction option for every transformer you want to include in filter, before you filter.

### Transformer Add/Edit

Similar logic is needed to add a new transformer or change the existing one. So I decided to use one component that depending on whether the property **create** *true* or *false* will call the *createTransformer* or *updateTransformer* method on action *Save*.The form name is determined in the *displayTransformer* method, depending on the name of Transformer. If a new transformer is created, its name is *New* which can be modified and saved.
             
             
             displayTransformer(transformer: Trans): void 
                  // Set the local transformer property
                  this.transformer = transformer;
                  // Reset the form back to pristine
                  this.transformerForm.reset();
                  // Display the appropriate page title
                  if (this.transformer) {
                    if (this.transformer.name === 'New') {
                      this.pageTitle = 'Add Transformer';
                      this.create = true;
                    } else {
                      this.pageTitle = `Edit Transformer: ${this.transformer.name}`;
                    }
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
                
Much of the Edit Component logic refers to select options of the form.
The **change** event notifies component about a change happening in an option field of each select for vehicle types. In compnent method like *changeByGroup* : First, I filter all the vehicleGroup objects by the value selected in the select. Then I enable the next select option that is dependent on the value in the previous select option.

          <select class="form-control" formControlName="vehicleGroup" name="vehicleTypesGroup"    
          (change)="changeByGroup($event)" >
            <option *ngFor="let item of vehicleTypes " [value]="item.group" >{{item.group}}</option>
          </select>
                            ........................................
**API**    

During programming, I used *InMemoryDataService*. First, I needed to install the angular-in-memory-web-module from npm in my Angular project. Next, I wired the in-memory web api module with my application and provided the data service as a parameter for the .forRoot method of the InMemoryWebApiModule module.
**/src/transformers/transformer-data.ts** contains created service.

**Set up dev server proxy**

To use the backed server API, like JsonPlaceholder, I had to use a proxy. To use proxy had to add new proxy.conf.json and do some changes in package.json.

                    {
                      "/api/*": {
                        "target": "https://my-json-server.typicode.com/DyslexicDcuk/transformers-api",
                        "secure": false,
                        "logLevel": "debug",
                        "changeOrigin": true,
                        "pathRewrite": {"^/api" : "https://my-json-server.typicode.com/DyslexicDcuk/transformers-api"}
                      }
                    }

**Design decisions**

I made an introductory page  'welcome' on which I took the picture of a transformer in Gimp with the background of the cloud. The Google font I use associates me with robots. The blue color for adding and editing a single transformer was better than the black one.Both colors remind me of male theme like Transformers. Any addition more, it would be too much, in my mind.

**Screenshots**

![welcome](https://user-images.githubusercontent.com/6881169/57423468-763afb00-7214-11e9-98a5-ccdb27e950b8.png)
![listrans](https://user-images.githubusercontent.com/6881169/57423339-e72de300-7213-11e9-8168-257bb8398033.png)
![edit](https://user-images.githubusercontent.com/6881169/57423577-d762ce80-7214-11e9-8756-94999d4dd0ba.png)


