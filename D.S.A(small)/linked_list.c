#include<stdio.h>
#include<stdlib.h>

typedef struct node{
    int data;
    struct node *nxt;
}node;

node *a=NULL;

int main(){
    node *temp=(node *)malloc(sizeof(node));
    temp->data=2;
    temp->nxt=NULL;
    a=temp;
    printf("%d\n",temp->data);
    printf("%p",temp->nxt);


    free(temp);
    return 0;



}
