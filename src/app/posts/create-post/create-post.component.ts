import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: "./create-post.component.html",
  styleUrls: ['./create-post.component.css']
})
export class CreatePostCompenent{
  enteredTitle = '';
  enteredContent = '';

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }

    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    };

    this.postsService.addPost(post)

    form.reset();
}
}
