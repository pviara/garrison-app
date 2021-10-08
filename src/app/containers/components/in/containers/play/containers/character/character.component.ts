import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICharacter } from "src/models/dynamic/ICharacter";

@Component({
  selector: 'garrison-in-play-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  character!: ICharacter;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this.character = this._route.snapshot.data.character;
    console.log('resolved character:', this.character);
  }
}
