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

void Reversed(){
    Node *current,*prev,*next;
    next=NULL;
    prev=NULL;
    current=head;
    while(current!=NULL){
        next=current->nxt;
        current->nxt=prev;
        prev=current;
        current=next;
    };
    head=prev;
};

void Print(){
    Node *tmp=head;
    while(tmp!=NULL){
        printf("%d\n",tmp->data);
        tmp=tmp->nxt;
    };
};

int main(){
    Insert(1);
    Insert(2);
    Insert(3);
    Insert(4);
    Insert(5);
    Insert(6);
    Insert(7);
    Insert(8);
    Insert(9);
    Insert(10);

    Print();

    Reversed();

    Print();
    
}
