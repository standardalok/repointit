#include<stdio.h>
#include<stdlib.h>

typedef struct Node{
    int num;
    struct Node *nxt;
}Node;

Node *head=NULL;


void Insert(int n){
    Node *tmp1=(Node *)malloc(sizeof(Node));
    tmp1->num=n;
    tmp1->nxt=NULL;
    if(head==NULL){
        head=tmp1;
        return;
    };

    Node *tmp2=head;
    while(tmp2->nxt!=NULL)tmp2=tmp2->nxt;
    tmp2->nxt=tmp1;
};

void Print(){
    Node *tmp=head;
    while(tmp!=NULL){
        printf("%d\n",tmp->num);
        tmp=tmp->nxt;
    }
};

void Reverse(){
    Node *current,*next=NULL,*prev=NULL;
    current =head;
    while(current!=NULL){
        next=current->nxt;
        current->nxt=prev;
        prev=current;
        current=next;
    }
    head=prev;
};

int main(){
    for(int i=1;i<21;i++)Insert(i);

    Print();

    Reverse();

    printf("The reversed list is ;\n");
    Print();
    
    return 0;
}