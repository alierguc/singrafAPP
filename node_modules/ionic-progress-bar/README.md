# ionic-progress-bar

Simple progress bar alert for Ionic3

Installation
-------------

```
npm i ionic-progress-bar --save
```

Setup
------

First, import `IonicSimpleProgressBarModule` and `SimpleProgressBarProvider` to your `app.module.ts` that is normally located in `src\app\app.module.ts`.

```
import { IonicSimpleProgressBarModule, SimpleProgressBarProvider } from 'ionic-progress-bar';

@NgModule({
  imports: [
    IonicSimpleProgressBarModule.forRoot()
  ],
  providers:[
    SimpleProgressBarProvider
  ]
})
export class AppModule { }
```

Usage
------

Add the `SimpleProgressBarProvider` to your component

```
import {SimpleProgressBarProvider } from 'ionic-progress-bar';
```

Add the provider to your `component constructor`

```
constructor(
   private _progressBar: SimpleProgressBarProvider
)
```

Use it

```
this._progressBar.present("Starting sync", 5).subscribe(
    () => {
        ....
        this._progressBar.setMilestone("Sync process 1");
        ....
        this._progressBar.setMilestone("Sync process 2");
        ....
        this._progressBar.setMilestone("Sync process 3");
        ....
        this._progressBar.setMilestone("Sync process 4");
        ....
        this._progressBar.setMilestone("Sync process 5");
        ....
        this._progressBar.dismiss();
    },
    (err) => {
        console.error(err);
    }
);
```