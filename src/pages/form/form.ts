import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { TodoProvider } from './../../providers/todo/todo';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  todo = {
    task: '',
    done: false
  }

  title: string = 'Nouvelle tâche';

  editMode = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public todoProvider: TodoProvider,
    public actionSheetCtrl: ActionSheetController) {
    let data = navParams.get('todo');

    if (data) {
      this.todo = data;
      this.editMode = true;
      this.title = "Modification d'une tâche";
    }
  }

  validForm() {
    if (this.todo.task.trim() != "") {
      if (!this.editMode) {
        this.todoProvider.add(this.todo);
      } else {
        this.todoProvider.edit(this.todo);
      }
      this.navCtrl.pop();
    }
  }

  showMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Que faire ?",
      buttons: [
        {
          text: 'Aller à la plage', icon: 'star',
          handler: () => { console.log('plage') }
        },
        {
          text: 'Supprimer', role: 'destructive',
          handler: () => { console.log('supprimer') }
        },
        {
          text: 'Annuler', role: 'cancel',
          handler: () => { console.log('annuler') }
        }
      ]
    });
    actionSheet.present();
  }
}
