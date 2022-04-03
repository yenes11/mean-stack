import { Component } from '@angular/core';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: [ './list-post.component.css']
})
export class ListPostComponent{
  // posts = [
  //   {
  //     title: 'First post title',
  //     content: 'First post content!'
  //   },
  //   {
  //     title: 'Second post title',
  //     content: 'Second post content!'
  //   },
  //   {
  //     title: 'Third post title',
  //     content: 'Third post content!'
  //   }
  // ]
  posts = []
}
