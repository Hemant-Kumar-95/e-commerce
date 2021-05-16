import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule as PrimeNgSharedModule } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgSharedModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    InputMaskModule,
    DynamicDialogModule,
    CardModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    OverlayPanelModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    TagModule,
    CheckboxModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    InputMaskModule,
    DynamicDialogModule,
    PrimeNgSharedModule,
    CardModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    OverlayPanelModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    TagModule,
    CheckboxModule
  ],
  providers: []
})
export class SharedModule { }
