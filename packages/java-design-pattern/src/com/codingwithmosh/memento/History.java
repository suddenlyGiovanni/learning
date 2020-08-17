package com.codingwithmosh.memento;

import java.util.ArrayList;
import java.util.List;

// Caretaker
public class History {
    private List<EditorState> states = new ArrayList<>();

    public void push(EditorState state) {
        states.add(state);
    }

    public EditorState pop() {
        int lastIndex = states.size() -1;
        EditorState lastState = states.get(lastIndex);
        states.remove(lastState);
        return  lastState;
    }

}
