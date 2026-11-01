#include<stdio.h>
#include<stdlib.h>


typedef struct Node{
    int data;
    struct Node *nxt;
}Node;

Node *A=NULL;


int main(){

    Node *tmp=(Node *)malloc(sizeof(Node));
    (*tmp).data=4;
    tmp->nxt=NULL;
    A=tmp;

    tmp=(Node *)malloc(sizeof(Node));
    tmp->data=2;
    tmp->nxt=NULL;

    Node *tmp1=A;
    while(tmp1->nxt!=NULL){
        printf("%d",tmp1->data);
        tmp1=tmp1->nxt;
        printf("%d",tmp1->data);

    }
    tmp1->nxt=tmp;

    printf("%d\n",A->data);
    printf("%p",A->nxt);

    free(tmp);

    return 0;
}