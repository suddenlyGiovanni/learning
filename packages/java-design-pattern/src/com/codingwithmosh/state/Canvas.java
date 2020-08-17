package com.codingwithmosh.state;

// Context
public class Canvas {
    private Tool currentTool;

    // request()
    public void mouseDown(){
        currentTool.mouseDown();

    }

    public void mouseUp(){
        currentTool.mouseUp();
    }

    public Tool getCurrentTool() {
        return currentTool;
    }

    public void setCurrentTool(Tool currentTool) {
        this.currentTool = currentTool;
    }
}
