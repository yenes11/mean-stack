import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: "./create-post.component.html",
  styleUrls: ['./create-post.component.css']
})
export class CreatePostCompenent{
  postContent = '';
  newPost = '';
  onAddPost(){
    this.newPost = this.postContent;
  }
}
