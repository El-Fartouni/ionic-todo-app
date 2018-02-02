import { Component } from '@angular/core';
import { FormPage } from '../form/form';
import { NavController } from 'ionic-angular';
import { TodoProvider } from './../../providers/todo/todo';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todoList


  public filterList: string[] = ['Toutes', 'En cours', 'Terminées'];

  public selectedFilter: string = 'Toutes';

  constructor(public navCtrl: NavController,
    public todoProvider: TodoProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.filterTodo();
  }

  ionViewWillEnter() {
    this.selectedFilter = 'Toutes';
    this.filterTodo();
  }

  filterTodo() {
    let selectedItem = this.selectedFilter.trim();
    if (selectedItem == 'En cours') {
      this.todoList = this.todoProvider.getNotDone();
    } else if (selectedItem == 'Terminées') {
      this.todoList = this.todoProvider.getDone();
    } else {
      this.todoProvider.getAll().then(
        (data) => {
          this.todoList = data;
        }
      );
    }
  }

  delete(pos) {
    // Création d'une alerte de confirmation
    let ConfirmDelete = this.alertCtrl.create({
      title: 'Confirmation de suppression ?',
      message: 'Voulez-vous vraiment supprimer cette tâche ?',
      subTitle: 'Lisez ceci avant de cliquer',
      buttons: [
        // Bouton annuler
        { text: 'Annuler', role: 'cancel' },
        // Button valider
        {
          text: 'Valider',
          handler: () => {
            this.todoProvider.delete(pos);
            toastOk.present();
          }
        }
      ]
    });
    ConfirmDelete.present();

    // Définition d'un toast
    let toastOk = this.toastCtrl.create(
      {
        message: 'Suppression effectuée',
        duration: 2000,
        position: 'top'
      }
    );
  }

  edit(todo) {
    this.navCtrl.push(FormPage, { todo: todo });
  }

  add() {
    this.navCtrl.push(FormPage);
  }

  changeDone(todo) {
    todo.done = !todo.done;
    this.todoProvider.edit(todo);
    if (this.selectedFilter != "Toutes") {
      this.filterTodo();
    }
  }
}
