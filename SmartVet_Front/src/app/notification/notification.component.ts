import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() message: string = ''; // The message to display in the notification
  @Input() duration: number = 3000; // Duration to show the notification in milliseconds
  isVisible: boolean = false;

  ngOnInit() {
    this.showNotification();
  }

  showNotification() {
    this.isVisible = true;

    // Automatically hide the notification after the specified duration
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
}
