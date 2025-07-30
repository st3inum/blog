#include <bits/stdc++.h>
using namespace std;

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t; cin >> t; while(t--) {
		int n;
		string s; cin >> n >> s;
		for(int i = 0; i + 2 < n; i++) {
			if(s[i] != '0') {
				s[i] = '1';
				for(int j = i + 1; j < n; j++) s[j] = '0';
				break;
			}
		}
		cout << s << '\n';
	}
	return 0;
}