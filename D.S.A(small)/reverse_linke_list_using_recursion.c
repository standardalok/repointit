#include<stdio.h>
#include<stdlib.h>

typedef struct Node{
    int data;
    struct Node *nxt;
}Node;

Node *head = NULL;

void Insert(int data){
    Node *tmp1=(Node *)malloc(sizeof(Node));
    tmp1->data=data;
    tmp1->nxt=NULL;

    if(head==NULL){
        tmp1->nxt=head;
        head=tmp1;
        return;
    }

    Node *tmp2=head;
    while(tmp2->nxt!=NULL){
        tmp2=tmp2->nxt;
    }
    tmp2->nxt=tmp1;
};


void Print(){
    Node *tmp=head;
    while(tmp!=NULL){
        printf("%d\n",tmp->data);
        tmp=tmp->nxt;
    };
};

void R_reversed(Node *p){
    if(p->nxt==NULL){
        head=p;
        return;
    }
    R_reversed(p->nxt);
    Node *a=p->nxt;
    a->nxt=p;
    p->nxt=NULL;
}

int main(){
    for(int i=0;i<10;i++)Insert(i);

    Print();

    R_reversed(head);

    Print();
    
}
