import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss'],
})
export class JobPostComponent {
  jobTitle: String = 'Software Developer';
  jobDescription: String = 'Knowledge of Angular and TypeScript...';
  searchText: string = '';
  jobsArray = [
    {
      img: 'https://source.unsplash.com/UcYoEO5nSNE',
      name: 'PSYCHOLOGY',
      txt: 'Getting to the heart of the matter: a tailored approah to AF to trt rt  trhtrt rthrt rtr trtrt rtr tr trtrtr trt rt gdfg fdh dsg fdg fdsg fds gfd gfdg fdsg fd gfds ',
      maticon: 'video_library',
      nature: 'WATCH',
      category: '',
      keywords: '',
    },
    {
      img: 'https://source.unsplash.com/go8WfzJ3KlE',
      name: 'CARDIOLOGY',
      txt: 'Getting to the heart of the matter: a tailored approah to AF to trt rt  trhtrt rthrt rtr trtrt rtr tr trtrtr trt rt gdfg fdh dsg fdg fdsg fds gfd gfdg fdsg fd gfds ',
      maticon: 'reorder',
      nature: 'READ',
      category: '',
      keywords: '',
    },

    {
      img: 'https://source.unsplash.com/7JYVKRo7i5Q',
      name: 'CARDIOLOGY',
      txt: 'Getting to the heart of the matter: a tailored approah to AF to trt rt  trhtrt rthrt rtr trtrt rtr tr trtrtr trt rt gdfg fdh dsg fdg fdsg fds gfd gfdg fdsg fd gfds ',
      maticon: 'reorder',
      nature: 'READ',
      category: '',
      keywords: '',
    },
    {
      img: 'https://source.unsplash.com/zi7cG2d6Mrk',
      name: 'CARDIOLOGY',
      txt: 'Getting to the heart of the matter: a tailored approah to AF to trt rt  trhtrt rthrt rtr trtrt rtr tr trtrtr trt rt gdfg fdh dsg fdg fdsg fds gfd gfdg fdsg fd gfds ',
      maticon: 'video_library',
      nature: 'WATCH',
      category: '',
      keywords: '',
    },

    {
      img: 'https://source.unsplash.com/uVPDAwgqLXY',
      name: 'CARDIOLOGY',
      txt: 'Getting to the heart of the matter: a tailored approah to AF to trt rt  trhtrt rthrt rtr trtrt rtr tr trtrtr trt rt gdfg fdh dsg fdg fdsg fds gfd gfdg fdsg fd gfds ',
      maticon: 'video_library',
      nature: 'WATCH',
      category: '',
      keywords: '',
    },

    {
      img: 'https://source.unsplash.com/GibvqWh_OcE',
      name: 'CARDIOLOGY',
      txt: 'Getting to the heart of the matter: a tailored approah to AF to trt rt  trhtrt rthrt rtr trtrt rtr tr trtrtr trt rt gdfg fdh dsg fdg fdsg fds gfd gfdg fdsg fd gfds ',
      maticon: 'video_library',
      nature: 'WATCH',
      category: '',
      keywords: '',
    },

    {
      img: 'https://source.unsplash.com/dq0x8AvNKv8',
      name: 'CARDIOLOGY',
      txt: 'Getting to the heart of the matter: a tailored approah to AF to trt rt  trhtrt rthrt rtr trtrt rtr tr trtrtr trt rt gdfg fdh dsg fdg fdsg fds gfd gfdg fdsg fd gfds ',
      maticon: 'video_library',
      nature: 'WATCH',
      category: '',
      keywords: '',
    },
  ];

  ngOnInit(): void {
    AOS.init();
  }
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log('a letter', this.searchText);
  }
  // constructor(jobTitle: String, jobDescription: String) {
  //   this.jobTitle = jobTitle;
  //   this.jobDescription = jobDescription;
  // }
}
