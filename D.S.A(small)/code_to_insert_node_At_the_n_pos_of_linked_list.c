#include<stdio.h>
#include<stdlib.h>


typedef struct Node{
    int data;
    struct Node *nxt;
}Node;


Node *A;


void Insert(int num,int pos){
    Node *tmp1=(Node *)malloc(sizeof(Node));
    tmp1->data=num;
    tmp1->nxt=NULL;
    if(pos==1){
        tmp1->nxt=A;
        A=tmp1;
        return;
    }
    Node *tmp2=A;
    for(int i=0;i<pos-2;i++){
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
    Insert(3,1);
    Insert(4,2);
    Insert(12,3);
    Insert(6,1);
    
    Print();

    return 0;
}