import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Post } from './post.model';
//import { response } from 'express';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            }
          });
        }))
        .subscribe((transformedPosts) => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post) {
        const _post: Post = {
            id: null,
            title: post.title,
            content: post.content
        }

        this.http.post< {message: string, postId: string }>('http://localhost:3000/api/posts', post)
        .subscribe(responseData => {
            const id = responseData.postId;
            _post.id = id
            this.posts.push(_post);
            this.postsUpdated.next([...this.posts]);
        });

    }

    deletePost(postId: string) {
      this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      })
    }
}
