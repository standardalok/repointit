#include<stdio.h>
#include<stdlib.h>


typedef struct Node{
    int data;
    struct Node *nxt;
}Node;

Node *A;

void Insert(int d,int p){
    Node *tmp1=(Node *)malloc(sizeof(Node));
    
    tmp1->data=d;
    tmp1->nxt=NULL;
    
    if(p==1){
        tmp1->nxt=A;
        A=tmp1;
        return;
    }
    Node *tmp2=A;
    for(int i=0;i<p-2;i++){
        tmp2=tmp2->nxt;
    }
    tmp1->nxt=tmp2->nxt;
    tmp2->nxt=tmp1;
};

void Print(){
    Node *tmp=A;
    while(tmp!=NULL){
        printf("%d\n",tmp->data);
        tmp=tmp->nxt;
    }
};

int main(){
    A=NULL;
    Insert(10,1);
    Insert(20,2);
    Insert(1,1);
    Insert(30,4);
    Print();
    
    return 0;
}