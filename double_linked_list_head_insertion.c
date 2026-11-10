#include<stdio.h>
#include<stdlib.h>

typedef struct Node{
    int data;
    struct Node *nxt;
    struct Node *prev;
}Node;

Node *head=NULL;

Node *Getnewnode(int x){
    Node *tmp=(Node *)malloc(sizeof(Node));
    tmp->data=x;
    tmp->nxt=NULL;
    tmp->prev=NULL;
    printf("The New Node is at %p\n",tmp);
    return tmp;
}

void insertingathead(int x){
    Node *tmp2=Getnewnode(x);
    if (head==NULL){
        head=tmp2;
        return;
    }
    head->prev=tmp2;
    tmp2->nxt=head;
    head=tmp2;
}

void Printallnodes(){
    Node *tmp3=head;
    while(tmp3!=NULL){
        tmp3=tmp3->nxt;
        printf("The Number is %d,\n",tmp3->data);
    }
}




int main(){
    for (int i=0;i<=20;i++){
        insertingathead(i);    
    }
    Printallnodes();
    return 0;
}