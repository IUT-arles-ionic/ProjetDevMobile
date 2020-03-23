import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ConnexionPage } from '../connexion/connexion.page';




@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})


export class FolderPage implements OnInit {
  public folder: string;
  public email: string;
  public password: string;
  public array: string [];
  public arraytemp : string;
  public verifconnection: boolean;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,public modalController: ModalController) { }

    async presentModal() {
    const modal = await this.modalController.create({
      component: ConnexionPage
    });
    return await modal.present();
  }

  ngOnInit() { 
    
    this.presentModal()

  }

}
