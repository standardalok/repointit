#include<stdio.h>
#include<stdlib.h>

typedef struct Node{
    int data;
    struct Node *nxt;
}Node;

Node *head;

void Insert(int data,int position){
    Node *tmp1=(Node *)malloc(sizeof(Node));
    tmp1->data=data;
    tmp1->nxt=NULL;
    if(position==1){
        tmp1->nxt=head;
        head=tmp1;
        return;
    }
    Node *tmp2=head;
    for(int i=0;i<position-2;i++){
        tmp2=tmp2->nxt;
    }
    tmp1->nxt=tmp2->nxt;
    tmp2->nxt=tmp1;
}

void Print(){
    Node *tmp=head;
    while(tmp!=NULL){
        printf("%d\n",tmp->data);
        tmp=tmp->nxt;
    }
}



int main(){
    head=NULL;
    Insert(10,1);
    Insert(20,2);
    Insert(30,3);
    Insert(40,2);

    Print();

    return 0;
}